describe("Validaciones del formulario de evento", () => {
  beforeEach(() => {
    cy.visit("/registrar-evento");
  });

  //ERORES DE CAMPOS VACIOS
  it("debe mostrar error si el titulo está vacío", () => {
    cy.fixture("test-data.json").then((data) => {
      const { titulo, ...eventoSinTitulo } = data.validEvent;
      cy.fillEventForm(eventoSinTitulo);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });
  it("debe mostrar error si la descripción está vacía", () => {
    cy.fixture("test-data.json").then((data) => {
      const { descripcion, ...eventoSinDescripcion } = data.validEvent;
      cy.fillEventForm(eventoSinDescripcion);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });
  it("debe mostrar error si el número de entradas está vacío", () => {
    cy.fixture("test-data.json").then((data) => {
      const { cantidadEntradas, ...eventoSinCantidad } = data.validEvent;
      cy.fillEventForm(eventoSinCantidad);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });
  it("debe mostrar error si el precio de entradas está vacío", () => {
    cy.fixture("test-data.json").then((data) => {
      const { precioEntrada, ...eventoSinPrecio } = data.validEvent;
      cy.fillEventForm(eventoSinPrecio);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });
  it("debe mostrar error si el lugar del evento está vacío", () => {
    cy.fixture("test-data.json").then((data) => {
      const { ubicacion, ...eventoSinUbicacion } = data.validEvent;
      cy.fillEventForm(eventoSinUbicacion);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });
  it("debe mostrar error si no hay imagen", () => {
    cy.fixture("test-data.json").then((data) => {
      const { imagen, ...eventoSinImagen } = data.validEvent;
      cy.fillEventForm(eventoSinImagen);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });
  it("debe mostrar error si no hay fecha", () => {
    cy.fixture("test-data.json").then((data) => {
      const { fecha, fecha2, ...eventoSinFecha } = data.validEvent;
      cy.fillEventForm(eventoSinFecha);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Todos los campos son obligatorios.");
  });

  ////////////////////////////////////////////////////////////////

  it("debe mostrar error si el titulo está repetido", () => {
    cy.fixture("test-data.json").then((data) => {
      const event = data.validEvent;
      cy.fillEventForm(event); //Mismo event que se creo en el test de evento, por lo tanto mismo titulo.
    });

    cy.get('button[type="submit"]').click();
    cy.contains("Ya existe un evento con el título");
  });

  it("la descripción no permite escribir más de 500 caracteres", () => {
    const tooLongText = "a".repeat(550);
    cy.get('textarea[name="descripcion"]').type(tooLongText);
    cy.get('textarea[name="descripcion"]')
      .invoke("val")
      .should((value) => {
        expect(value.length).to.eq(500);
      });
  });

  it("debe mostrar error si la cantidad de entradas es menor a 1", () => {
    cy.fixture("test-data.json").then((data) => {
      const event = data.invalidTicketsEvent;
      cy.fillEventForm(event);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("La cantidad de entradas debe ser mayor a 0");
  });

  it("debe mostrar error si el precio es menor a 1", () => {
    cy.fixture("test-data.json").then((data) => {
      const event = data.invalidPriceEvent;
      cy.fillEventForm(event);
    });

    cy.get('button[type="submit"]').click();
    cy.contains("El precio de la entrada debe ser mayor a 0");
  });
});
