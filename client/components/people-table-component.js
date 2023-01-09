class PersonTableComponent {
  htmlElement;
  tbody;
  onDelete;
  onEdit;
  editedRowId;

  constructor({ person, onDelete, onEdit }) {
    this.htmlElement = document.createElement('table');
    this.htmlElement.className = 'table table-dark table-hover';
    this.htmlElement.innerHTML = ` 
    <thead class="bg-dark text-white">
    <tr>
    <th scope="col">#</th>
    <th scope="col">Name</th>
    <th scope="col">Google searches (2022)</th>
    <th scope="col">Is canceled</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody></tbody>`;
    this.tbody = this.htmlElement.querySelector('tbody');
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.editedRowId = null;

    this.renderPeople(person, null);
  }

  createRowHtmlElement = (person) => {
    const { id, name, searches, canceled } = person;
    const tr = document.createElement('tr');
    const thisRowIsEdited = id === this.editedRowId;
    if (thisRowIsEdited) tr.classList.add('bg-edited');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${searches}</td>
      <td>${canceled}</td>
      <td>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-warning btn-sm ">${thisRowIsEdited ? 'Cancel' : 'Update Info'}</button>
          <button class="btn btn-danger btn-sm">✕</button>
        </div>
      </td>`;

    const deleteButton = tr.querySelector('.btn-danger');
    deleteButton.addEventListener('click', () => this.onDelete(id));

    const updateButton = tr.querySelector('.btn-warning');
    updateButton.addEventListener('click', () => this.onEdit(person));

    return tr;
  }

  renderPeople(person, editedRowId) {
    this.editedRowId = editedRowId;
    const rowsHtmlElements = person.map(this.createRowHtmlElement);

    this.tbody.innerHTML = null;
    this.tbody.append(...rowsHtmlElements);
  }
}

export default PersonTableComponent;