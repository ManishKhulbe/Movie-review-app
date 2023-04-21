import Label from "./Label";

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
    console.log("🚀 ~ file: MovieForm.jsx:179 ~ LabelWithBadge ~ badge:", badge);
    if (!badge) return null;
    const renderBadge = () => {
      return (
        <span className="dark:bg-dark-subtle  bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 translate-x-2 -translate-y-1 text-sm rounded-full flex justify-center items-center">
          {+badge <= 9 ? badge : "9+"}
        </span>
      );
    };
    return (
      <div className="relative">
        <Label htmlFor={htmlFor}>{children}</Label>
        {renderBadge()}
      </div>
    );
  };

export default LabelWithBadge  