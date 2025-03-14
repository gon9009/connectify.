export type DividerProps = {
  postType: "detail" | "list";
};

export const Divider = ({ postType }: DividerProps) => {
  return <hr className={`divider ${postType}__divider`} />;
};


