export default function Home() {
  return (
    <div className="home">
      <h1>Info Picture Home</h1>
      <p>
        This is a preliminary prototype based on discussion with Brian Rus
        regarding a Firebase CMS using React and D3 to show and edit information
        for different customers.
      </p>
      <p>
        Use the dropdown in the top left to switch between customers. This will
        update all the information shown in the interests, insights and info
        portrait sections. The data can then be edited under the edit tab.
      </p>
      <p>Further work on this could include adding authorization, making it secure, creating seperate applications for editting and viewing, adding rich text editors, input validation, pulling in the visualization data from Looker or other resources, etc. </p>
    </div>
  );
}
