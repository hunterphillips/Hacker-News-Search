import lightOnImg from '../assets/lightbulb_on.png';
import lightOffImg from '../assets/lightbulb_off.png';

export const Header = ({ lightOn, setLightOn, onClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      <h1 className="App-header" onClick={onClick}>
        Hacker News Search
      </h1>
      <img
        className="lightbulb"
        onClick={() => setLightOn(!lightOn)}
        src={lightOn ? lightOnImg : lightOffImg}
        alt="lightbulb"
      />
    </div>
  );
};
