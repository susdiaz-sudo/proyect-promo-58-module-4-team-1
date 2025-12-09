import Card from "./Card";

function Preview({ formData }) {
  return (
    <section className="preview">
      <div
        className="projectImage"
        style={{
          backgroundImage: formData.image ? `url(${formData.image})` : "",
        }}
      />

      <Card formData={formData} />
    </section>
  );
}

export default Preview;
