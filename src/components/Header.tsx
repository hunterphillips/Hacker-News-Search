import lightOnImg from '../assets/lightbulb_on.png';
import lightOffImg from '../assets/lightbulb_off.png';

interface HeaderProps {
  lightOn: boolean; // true if 'lightbulb' is selected ('light' theme applied)
  setLightOn: (lightOn: boolean) => void;
  onClick: () => void;
}

export const Header = ({ lightOn, setLightOn, onClick }: HeaderProps) => {
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
