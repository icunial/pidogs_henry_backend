const validateName = (name) => {
  if (!name) return "Name parameter is missing";
  if (typeof name !== "string") return "Name must be a string!";
  if (name.trim().length > 15 || name.trim().length < 4)
    return "Name must be between 4 and 15 characters long!";
  return false;
};
