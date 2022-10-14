import styles from "@styles/Main.module.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import PreviewBanner from "@components/PreviewBanner";

export default function MainLayout(props) {
  const { preview } = props;
  return (
    <>
      {preview && <PreviewBanner />}
      <Header />
      <main className={styles.main}>
        {/* TODO: refactor styles and kill off the extra div */}
        <div className="contentContainer">
          {props.children}
        </div>
      </main>
      <Footer />
    </>
  );
}