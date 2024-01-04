// Gravatar.tsx
import { createHash } from 'crypto';
import Image from 'next/image';

interface GravatarProps {
  email: string;
  size?: number;
}

const Gravatar: React.FC<GravatarProps> = ({ email, size = 200 }) => {
  // Generate the MD5 hash of the email address
  const hash = createHash('md5').update(email.toLowerCase().trim()).digest('hex');

  // Construct the Gravatar URL
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;

  return <Image src={gravatarUrl} alt="Gravatar" width={size} height={size} className="w-[50px] h-[50px] object-cover align-text-top inline mx-2 rounded-r-[100px] rounded-l-[100px]" />;
};

export default Gravatar;
