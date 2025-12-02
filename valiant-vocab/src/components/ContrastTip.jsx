import './ContrastTip.css';

const ContrastTip = ({ tip }) => {
  if (!tip) return null;

  return (
    <div className="contrast-tip">
      {tip}
    </div>
  );
};

export default ContrastTip;

