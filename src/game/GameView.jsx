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
import SetelanScreen from '../screens/SetelanScreen.jsx';

// The 390×844 phone frame. Layer order matters: offers, pulls and toasts sit above screens.
export default function GameView({ v }) {
  return (
    <div className="phone" data-theme={v.theme} data-lite={v.lite ? "1" : undefined} data-screen-label={v.screenLabel}>
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
        {v.isSetelan && <SetelanScreen v={v} />}
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
      {v.purchaseDone && (
        <div onClick={v.purchaseDone.close} style={{ position: "absolute", inset: "0", zIndex: "46", display: "grid", placeItems: "center", padding: "0 28px", background: "rgba(32,22,17,.7)", animation: "fadeIn .2s ease-out both" }}>
          <div style={{ width: "100%", boxSizing: "border-box", padding: "22px 18px 18px", border: "3px solid #2B1E18", borderRadius: "26px", background: "linear-gradient(180deg,#FFF8EC,#F3E6FA)", boxShadow: "var(--lift6)", textAlign: "center", animation: "hatchPop .5s ease-out both" }}>
            <div style={{ font: "500 11px/1 'DM Mono',monospace", letterSpacing: ".1em", color: "#2F7A5C" }}>PEMBAYARAN BERHASIL</div>
            <div style={{ font: "64px/1 'Material Symbols Rounded'", color: "#7E43B5", marginTop: "10px", animation: "itemFloat 2s ease-in-out infinite" }}>diamond</div>
            <div style={{ font: "38px/1 var(--display)", marginTop: "6px" }}>+{v.purchaseDone.gems}</div>
            <div style={{ font: "600 13px/1.4 'Bricolage Grotesque'", color: "#5B4A40", marginTop: "6px" }}>Permata sudah masuk ke akunmu. Saldo sekarang {v.purchaseDone.balance}. Terima kasih sudah mendukung Santoni!</div>
            <button onClick={v.purchaseDone.close} style={{ width: "100%", boxSizing: "border-box", height: "48px", marginTop: "14px", border: "3px solid #2B1E18", borderRadius: "16px", background: "#F2B63C", color: "#2B1E18", boxShadow: "var(--lift4)", font: "20px/1 var(--display)", cursor: "pointer" }}>Mantap</button>
          </div>
        </div>
      )}
      {v.confirm && <ConfirmDialog c={v.confirm} />}
      {v.hasToast && <Toast v={v} />}
      <div className="phone-rim" />
    </div>
  );
}
