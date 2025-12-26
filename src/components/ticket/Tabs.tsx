type TabsProps = {
  tabsOptions: {
    label: string;
    value: string;
  }[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

function Tabs({ tabsOptions, currentTab, setCurrentTab }: TabsProps) {
  return (
    <div className="flex gap-5 border-b">
      {tabsOptions.map((t) => {
        const active = t.value === currentTab;
        return (
          <button
            key={t.value}
            onClick={() => setCurrentTab(t.value)}
            className={`
          relative p-3 text-xs sm:text-base font-medium  cursor-pointer
          ${active ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}
        `}
          >
            {t.label}
            {active && (
              <span className="absolute left-0 -bottom-[1px] h-0.5 w-full bg-blue-600 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
