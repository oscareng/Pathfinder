const NodeIcon = (props) => {
  let extraClassName = props.extraClassName;
  return (
    <div className={`node-container ${extraClassName}`}>
      <div className={`node ${extraClassName}`}></div>
    </div>
  );
};

export default NodeIcon;
