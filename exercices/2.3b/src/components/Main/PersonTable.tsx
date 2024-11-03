// import css
import './PersonTable.css';

// Créer les type
type Person = {
  name: string;
  age: number;
};

// Créer les données
const persons: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

// Créer le composant
function PersonTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person, index) => (
          <tr key={index}>
            <td>{person.name}</td>
            <td>{person.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PersonTable;