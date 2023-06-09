import Accordion from "./components/Accordion";
import Header from "./components/Header";
import PageHeader from "./components/PageHeader";
import { ChipComponent } from "@sephora-csc/csc-component-library";

export default function AccessManagement() {
  return (
    <>
      <Header />
      <PageHeader />
      <section className="tw-px-5 tw-sm:tw-px-16 tw-lg:tw-px-36">
        <div className="tw-relative tw-p-7">
          <div className="tw-text-center ">
            <h1 className="tw-text-xl tw-font-bold">Primary Features</h1>
            <p className="tw-text-sm tw-pt-4 tw-max-w-xl tw-m-auto">
              Sed Eu Semper Ligula. Proin Dapibus Nunc Quis Ligula Ullamcorper
              Venenatis. Nulla Mollis Sagittis
            </p>
          </div>
          <button className="tw-absolute tw-top-0 tw-bottom-0 tw-right-0">
            Add New
          </button>
        </div>
        <Accordion title={"Home Page"}>
          <div className="tw-max-w-2xl">
            <p>
              Nullam placerat cursus ex, at varius purus rhoncus a. Quisque
              consequat ultricies ex, ac interdum lorem euismod ac. Vestibulum
              cursus, mi sit amet hendrerit vestibulum, arcu diam sagittis mi,
              eu lacinia nibh nisi a metus. Sed eu semper ligula. Proin dapibus
              nunc quis ligula ullamcorper venenatis. Nulla mollis sagittis
            </p>
            <div className="tw-mt-7">
              <h3 className="tw-text-base tw-font-bold">Roles</h3>
              <ChipComponent />
            </div>
            <div className="tw-mt-7">
              <h3 className="tw-text-base tw-font-bold">SUb features</h3>
              <ChipComponent />
            </div>
          </div>
        </Accordion>
      </section>
    </>
  );
}
