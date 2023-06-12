import { Link } from "react-router-dom";
import Accordion from "./components/Accordion";
import Header from "./components/Header";
import PageHeader from "./components/PageHeader";
import { ChipComponent, TextBox } from "@sephora-csc/csc-component-library";
import { useState } from "react";
import Modal from "./components/Modal";

const subFeatures = [
  {
    id: 1,
    title: "Home Page",
    desc: "Nullam placerat cursus ex, at varius purus rhoncus a. Quisque consequat ultricies ex, ac interdum lorem euismod ac. Vestibulum cursus, mi sit amet hendrerit vestibulum, arcu diam sagittis mi, eu lacinia nibh nisi a metus. Sed eu semper ligula. Proin dapibus nunc quis ligula ullamcorper venenatis. Nulla mollis sagittis",
  },
  {
    id: 2,
    title: "Client Dashboard Page",
    desc: "Nullam placerat cursus ex, at varius purus rhoncus a. Quisque consequat ultricies ex, ac interdum lorem euismod ac. Vestibulum cursus, mi sit amet hendrerit vestibulum, arcu diam sagittis mi, eu lacinia nibh nisi a metus. Sed eu semper ligula. Proin dapibus nunc quis ligula ullamcorper venenatis. Nulla mollis sagittis",
  },
  {
    id: 3,
    title: "Order Dashboard Page",
    desc: "Nullam placerat cursus ex, at varius purus rhoncus a. Quisque consequat ultricies ex, ac interdum lorem euismod ac. Vestibulum cursus, mi sit amet hendrerit vestibulum, arcu diam sagittis mi, eu lacinia nibh nisi a metus. Sed eu semper ligula. Proin dapibus nunc quis ligula ullamcorper venenatis. Nulla mollis sagittis",
  },
];

export default function AccessManagement() {
  const [modalState, setModalState] = useState(false);
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
          <button
            className="tw-absolute tw-top-0 tw-bottom-0 tw-right-0"
            onClick={() => setModalState(true)}
          >
            Add New
          </button>
        </div>
        {subFeatures.map((item) => (
          <Accordion title={item.title} key={item.id}>
            <div className="tw-max-w-2xl">
              <p>{item.desc}</p>
              <div className="tw-mt-7">
                <h3 className="tw-text-base tw-font-bold">Roles</h3>
                <ChipComponent
                  label="Sub feature 1"
                  color={
                    "tw-p-4 tw-inline-block tw-w-auto tw-bg-gray-4 tw-rounded-md"
                  }
                />
              </div>
              <div className="tw-mt-7">
                <div className="tw-relative">
                  <h3 className="tw-text-base tw-font-bold">Sub features</h3>
                  <Link
                    className="tw-absolute tw-top-0 tw-bottom-0 tw-right-0"
                    to={`/feature/${item.id}`}
                  >
                    <span className="tw-border tw-border-black tw-rounded-full tw-w-5 tw-h-5 tw-inline-block">
                      +
                    </span>
                    Add New
                  </Link>
                </div>
                <ChipComponent />
              </div>
            </div>
          </Accordion>
        ))}
      </section>
      <Modal isOpen={modalState} title="Create New Feature">
        <TextBox />
        <TextBox />
      </Modal>
    </>
  );
}
