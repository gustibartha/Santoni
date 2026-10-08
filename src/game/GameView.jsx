import Hud from '../screens/Hud.jsx';
import Lobby from '../screens/Lobby.jsx';
import Run from '../screens/Run.jsx';
import SkillOffer from '../screens/SkillOffer.jsx';
import Battle from '../screens/Battle.jsx';
import Hero from '../screens/Hero.jsx';
import MapScreen from '../screens/MapScreen.jsx';
import Shop from '../screens/Shop.jsx';
import PullReveal from '../screens/PullReveal.jsx';
import Result from '../screens/Result.jsx';
import Journal from '../screens/Journal.jsx';
import NavBar from '../screens/NavBar.jsx';
import Toast from '../screens/Toast.jsx';
import MisiScreen from '../screens/MisiScreen.jsx';
import ConfirmDialog from '../screens/ConfirmDialog.jsx';

// The 390×844 phone frame. Layer order matters: offers, pulls and toasts sit above screens.
export default function GameView({ v }) {
  return (
    <div className="phone" data-screen-label={v.screenLabel}>
      {v.showHud && <Hud v={v} />}
      {v.isLobby && <Lobby v={v} />}
      {v.isRun && <Run v={v} />}
      {v.hasOffer && <SkillOffer v={v} />}
      {v.isBattle && <Battle v={v} />}
      {v.isHero && <Hero v={v} />}
      {v.isMap && <MapScreen v={v} />}
      {v.isShop && <Shop v={v} />}
      {v.hasPull && <PullReveal v={v} />}
      {v.isResult && <Result v={v} />}
      {v.isJournal && <Journal v={v} />}
      {v.isMisi && <MisiScreen v={v} />}
      {v.showNav && <NavBar v={v} />}
      {v.confirm && <ConfirmDialog c={v.confirm} />}
      {v.hasToast && <Toast v={v} />}
      <div className="phone-rim" />
    </div>
  );
}
