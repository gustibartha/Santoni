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
import FestivalScreen from '../screens/FestivalScreen.jsx';
import TemanScreen from '../screens/TemanScreen.jsx';
import ModeHub from '../screens/ModeHub.jsx';
import TambangScreen from '../screens/TambangScreen.jsx';
import BengkelScreen from '../screens/BengkelScreen.jsx';
import RekanScreen from '../screens/RekanScreen.jsx';
import PetScreen from '../screens/PetScreen.jsx';
import SvgDefs from '../components/SvgDefs.jsx';
import ItemSheet from '../screens/ItemSheet.jsx';
import SuratScreen from '../screens/SuratScreen.jsx';
import HarianScreen from '../screens/HarianScreen.jsx';

// The 390×844 phone frame. Layer order matters: offers, pulls and toasts sit above screens.
export default function GameView({ v }) {
  return (
    <div className="phone" data-theme={v.theme} data-screen-label={v.screenLabel}>
      <SvgDefs />
      {v.showHud && <Hud v={v} />}
      <div key={v.screenKey} className="screen-in">
        {v.isLobby && <Lobby v={v} />}
        {v.isRun && <Run v={v} />}
        {v.isBattle && <Battle v={v} />}
        {v.isHero && <Hero v={v} />}
        {v.isMap && <MapScreen v={v} />}
        {v.isShop && <Shop v={v} />}
        {v.isResult && <Result v={v} />}
        {v.isJournal && <Journal v={v} />}
        {v.isMisi && <MisiScreen v={v} />}
        {v.isFestival && <FestivalScreen v={v} />}
        {v.isTeman && <TemanScreen v={v} />}
        {v.isSurat && <SuratScreen v={v} />}
        {v.isHarian && <HarianScreen v={v} />}
        {v.isMode && <ModeHub v={v} />}
        {v.isTambang && <TambangScreen v={v} />}
        {v.isBengkel && <BengkelScreen v={v} />}
        {v.isRekan && <RekanScreen v={v} />}
        {v.isPet && <PetScreen v={v} />}
      </div>
      {v.hasOffer && <SkillOffer v={v} />}
      {v.hasPull && <PullReveal v={v} />}
      {v.showNav && <NavBar v={v} />}
      {v.itemSheet && <ItemSheet s={v.itemSheet} />}
      {v.confirm && <ConfirmDialog c={v.confirm} />}
      {v.hasToast && <Toast v={v} />}
      <div className="phone-rim" />
    </div>
  );
}
