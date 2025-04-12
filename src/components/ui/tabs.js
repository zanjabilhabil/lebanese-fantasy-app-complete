import { useState } from "react";
export function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue);
  return children.map(child =>
    child.type.name === "TabsList" ?
      <TabsList onSelect={setActive}>{child.props.children}</TabsList> :
      (child.props.value === active ? <div>{child.props.children}</div> : null)
  );
}
export function TabsList({ children, onSelect }) {
  return <div className="flex space-x-2 mb-4">{children.map(child => (
    <TabsTrigger key={child.props.value} value={child.props.value} onSelect={onSelect}>
      {child.props.children}
    </TabsTrigger>
  ))}</div>;
}
export function TabsTrigger({ value, children, onSelect }) {
  return <button onClick={() => onSelect(value)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">{children}</button>;
}
export function TabsContent({ children }) {
  return <div>{children}</div>;
}