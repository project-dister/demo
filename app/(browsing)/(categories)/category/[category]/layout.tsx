import Hero from "@/app/(browsing)/(hero)/Hero";
import IconList from "./components/IconList";
import styles from "./components/categories.module.scss";
import toTitleCase from "@/helpers/toTitleCase";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const title = `${toTitleCase(category)} | Dister.org`;
  const description = `Browse offer related to ${toTitleCase(
    category
  )} on Dister.org`;
  return {
    title: title,
    description: description,
  };
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string };
}) {
  const { category } = params;
  return (
    <main>
      <Hero />
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>
          Shop by
          <span className="orangeText"> Categories</span>
        </h2>
        <IconList category={category} />
        {children}
      </section>
    </main>
  );
}
