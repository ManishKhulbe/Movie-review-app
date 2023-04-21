const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold mr-3"
    >
      {" "}
      {children}
    </label>
  );
};

export default Label;
