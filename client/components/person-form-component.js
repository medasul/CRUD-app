class PersonFormComponent {
  htmlElement;
  onSubmit;
  nameInput;
  searchesInput;
  canceledInput;
  formNameElement;
  submitButton;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement('form');
    this.htmlElement.className = 'shadow p-4 form-bg';
    this.htmlElement.innerHTML = `
      <h2 class="h5 text-center text-white">Famous person</h2>
      <div class="mb-3">
        <label for="name" class="form-label text-white">Name</label>
        <input type="text" class="form-control" id="name" name="name">
      </div>
      <div class="mb-3">
        <label for="searches" class="form-label text-white">Google searches (2022)</label>
        <input type="number" class="form-control" id="searches" name="searches">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="canceled" name="canceled">
        <label class="form-check-label text-white" for="canceled">Is canceled</label>
      </div>
      <button type="submit" class="btn btn-success w-100">Submit</button>`;
    this.onSubmit = onSubmit;
    this.nameInput = this.htmlElement.querySelector('[name=name]');
    this.searchesInput = this.htmlElement.querySelector('[name=searches]');
    this.canceledInput = this.htmlElement.querySelector('[name=canceled]');
    this.formNameElement = this.htmlElement.querySelector('h2');
    this.submitButton = this.htmlElement.querySelector('button');

    this.htmlElement.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = {
      name: formData.get('name'),
      searches: formData.get('searches'),
      canceled: Boolean(formData.get('canceled')),
    }

    //ioc (coupled code isvengimas)
    this.onSubmit(values);

    event.target.reset();
  }

  enableEditing = ({ name, searches, canceled }) => {
    this.nameInput.value = name;
    this.searchesInput.value = searches;
    this.canceledInput.checked = canceled;
    this.formNameElement.innerText = 'Update Person';
    this.submitButton.innerText = 'Update Person';
    this.submitButton.className = 'btn btn-warning w-100';
  }

  disableEditing = () => {
    this.htmlElement.reset();
    this.formNameElement.innerText = 'Submit';
    this.submitButton.innerText = 'Update Person';
    this.submitButton.className = 'btn btn-success w-100';
  }
}

export default PersonFormComponent;
