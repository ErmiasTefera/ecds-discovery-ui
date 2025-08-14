import Link from 'next/link'
import Image from 'next/image'

export const HomeButton = () => {
    return (
        <Link href="/" className="flex items-center gap-2 font-medium">
        <Image
          src="https://iphce.org/wp-content/uploads/2021/08/output-onlinepngtools-e1627043832524-1-e1630407557168.png"
          alt="Home"
          width={160}
          height={40}
          className="h-8 w-auto rounded-md object-contain"
          priority
        />
      </Link>
    )
}