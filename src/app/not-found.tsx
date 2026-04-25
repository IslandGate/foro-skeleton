import Link from 'next/link'
import Image from "next/image";

export default function NotFound() {
    return (
      <>
        <main className="flex flex-col items-center h-screen justify-center font-garamond text-5xl leading-16">
        <Image
            src="/marketing-page-assets/il-foro-logo-wip.png"
            alt="il-foro-wip logo"
            width={120}
            height={60}
            className="h-auto w-45 p-2"
          />
          <h1 className="text-center">
            Sorry page not found 404...we'll will get this fixed asap.
          </h1>

          <h2 className="text-center">
            <span className="font-bold underline italic">
              <Link href="/">Click here</Link>
            </span>{" "}
            to go home
          </h2>
          <h2 className="text-center">Contact us : contactilforo@gmail.com</h2>
        </main>
      </>
    );
}
