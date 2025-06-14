export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}


export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map(part => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
};
