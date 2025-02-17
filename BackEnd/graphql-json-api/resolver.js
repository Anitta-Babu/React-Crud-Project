const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "studentData.json");
let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const writeDataToFile = () => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const resolvers = {
  Query: {
    students: () => data.students,
    student: (parent, args) =>
      data.students.find((student) => student.id === args.id),
  },
  Mutation: {
    createStudent: (parent, { input }) => {
      if (!input.firstName || !input.lastName || !input.age || !input.email) {
        throw new Error("All required fields must be provided.");
      }

      const newStudent = { id: uuidv4(), ...input };

      data.students.push(newStudent);

      writeDataToFile();

      return newStudent;
    },
    updateStudent: (parent, { id, input }) => {
      const index = data.students.findIndex((student) => student.id === id);
      if (index === -1) throw new Error("Student not found");
      const updatedStudent = { ...data.students[index], ...input };
      data.students[index] = updatedStudent;
      writeDataToFile();
      return updatedStudent;
    },
    deleteStudent: (parent, { id }) => {
      const index = data.students.findIndex((student) => student.id === id);
      if (index === -1) throw new Error("Student not found");
      const deletedStudent = data.students[index];
      data.students.splice(index, 1);
      writeDataToFile();
      return deletedStudent;
    },
  },
};

module.exports = resolvers;
