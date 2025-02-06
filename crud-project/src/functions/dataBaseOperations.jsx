import axios from "axios";

export const GetData = async (setData) => {
  try {
    const res = await axios.get("http://localhost:3001/students");
    setData(res.data);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const DeleteData = async (id, setData) => {
  try {
    await axios.delete(`http://localhost:3001/students/${id}`);

    const res = await axios.get("http://localhost:3001/students");
    setData(res.data);
  } catch (err) {
    console.error("Error deleting data:", err);
  }
};

export const CreateData = async (newData, setData) => {
  try {
    const existingStudentsRes = await axios.get(
      "http://localhost:3001/students"
    );
    const existingStudents = existingStudentsRes.data;

    const studentExists = existingStudents.some(
      (student) => student.email === newData.email
    );

    if (studentExists) {
      return { success: false, message: "Student is already present." };
    }

    const res = await axios.post("http://localhost:3001/students", newData);
    setData((prevData) => [...prevData, res.data]);

    return { success: true, message: "Student created successfully." };
  } catch (err) {
    console.error("Error creating data:", err);
    return { success: false, message: "Error creating student." };
  }
};

export const GetDataById = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3001/students/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
};

export const UpdateDataById = async (id, newData) => {
  try {
    const res = await axios.put(
      `http://localhost:3001/students/${id}`,
      newData
    );
    return res.data;
  } catch (err) {
    console.error("Error updating data:", err);
    return null;
  }
};

export const isValidUser = async (userData) => {
  try {
    const res = await axios.get("http://localhost:3002/users");

    if (res.status === 200) {
      const userExists = res.data.some((user) => {
        const isValidCredentials =
          user.email === userData.email && user.password === userData.password;

        const hasUserRole = user.role.includes("user");
        return isValidCredentials && hasUserRole;
      });

      return userExists;
    }
  } catch (err) {
    console.error("Error finding data:", err);
    return false;
  }
};
