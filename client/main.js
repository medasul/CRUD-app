import AlertComponent from "./components/alert-component.js";
import PersonFormComponent from "./components/person-form-component.js";
import PersonTableComponent from "./components/people-table-component.js";
import ContainerComponent from "./components/container-component.js";
import FlexContainerComponent from "./components/flex-container-component.js";
import ApiService from "./services/api-service.js";

let peopleTableComponent;
let personFormComponent;
let alertComponent;

let person;
let editedRowId = null;

const handlePersonDelete = async (id) => {
  try {
    await ApiService.deletePerson(id);
    person = await ApiService.getPeople();
    peopleTableComponent.renderPeople(person, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handlePersonCreate = async (personProps) => {
  try {
    await ApiService.createPerson(personProps);
    person = await ApiService.getPeople();
    peopleTableComponent.renderPeople(person, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handlePersonUpdate = async (personProps) => {
  try {
    await ApiService.updatePerson(editedRowId, personProps);
    person = await ApiService.getPeople();
    editedRowId = null;
    personFormComponent.disableEditing();
    peopleTableComponent.renderPeople(person, editedRowId);
  } catch (error) {
    alertComponent.show(error.message);
  }
}

const handlePersonEdit = (personProps) => {
  if (editedRowId === personProps.id) editedRowId = null;
  else editedRowId = personProps.id;

  peopleTableComponent.renderPeople(person, editedRowId);
  if (editedRowId === null) {
    personFormComponent.disableEditing();
    personFormComponent.onSubmit = handlePersonCreate;
  } else {
    personFormComponent.enableEditing(personProps);
    personFormComponent.onSubmit = handlePersonUpdate;
  }
}

(async function initialize() {
  const rootHtmlElement = document.querySelector('#root');
  const containerComponent = new ContainerComponent();
  alertComponent = new AlertComponent();
  containerComponent.addComponents(alertComponent);
  rootHtmlElement.append(containerComponent.htmlElement);
  try {
    person = await ApiService.getPeople();
    peopleTableComponent = new PersonTableComponent({
      person,
      onDelete: handlePersonDelete,
      onEdit: handlePersonEdit,
    });
    personFormComponent = new PersonFormComponent({
      onSubmit: handlePersonCreate,
    });
    const flexContainerComponent = new FlexContainerComponent();
    flexContainerComponent.addComponents(peopleTableComponent, personFormComponent);
    containerComponent.addComponents(flexContainerComponent);
  } catch (error) {
    alertComponent.show(error.message);
  }
})();
