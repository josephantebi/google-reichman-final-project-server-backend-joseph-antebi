class User {
  user_id: number;
  first_name: string;
  surname: string;
  email: string;
  color: string;

  constructor(
    user_id: number,
    first_name: string,
    surname: string,
    email: string,
    color: string
  ) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.surname = surname;
    this.email = email;
    this.color = color;
  }
}
export default User;
