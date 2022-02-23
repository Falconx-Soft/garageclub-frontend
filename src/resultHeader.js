import './resultHeader.css';
export default function ResultHeader(props) {
  return (
    <div className="resultHeader-div">
      <div className="resultHeaderIner-div">
        <i className="fa fa-check" aria-hidden="true"></i>
        <div className="resultLabel">
          <p>{props.formData.company}</p>
          <h1 className="resultHeader-heading">$400</h1>
        </div>
      </div>
    </div>
  );
}