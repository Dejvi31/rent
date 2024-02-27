"use client";
import Link from "next/link";

const Breadcrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-5 sm:py-7 ">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumbs?.map((breadCrumb, index) => (
            <li className="inline-flex items-center" key={index}>
              {index === breadCrumbs.length - 1 ? (
                <span className="text-gray-600">{breadCrumb.name}</span>
              ) : (
                <Link
                  href={breadCrumb.url}
                  className="text-gray-600  font-bold hover:text-gray-950"
                >
                  {breadCrumb.name}
                </Link>
              )}

              {index < breadCrumbs.length - 1 && (
                <span className="mx-1">/</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Breadcrumbs;
