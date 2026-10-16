export interface Photo {
  readonly src: string;
  readonly alt: string;
}

export interface Collection {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly photos: readonly Photo[];
  readonly links: readonly { label: string; href: string }[];
}

const ik = (file: string) => `https://ik.imagekit.io/olegchursin/${file}`;

/** ImageKit transforms; other hosts are returned unchanged. */
export function sized(src: string, width: number): string {
  if (!src.startsWith('https://ik.imagekit.io/')) return src;
  return `${src}?tr=w-${width}`;
}

export const collections: readonly Collection[] = [
  {
    id: 'travel',
    title: 'Travel',
    description:
      'National parks and coastlines of the American West and Hawaii.',
    photos: [
      {
        src: ik('travel-yosemite-2_00bCn8ymi.jpg'),
        alt: 'Yosemite Valley under clouds'
      },
      {
        src: ik('travel-joshue-tree_DA_GhkMIJC.jpg'),
        alt: 'Joshua trees in the desert'
      },
      { src: ik('travel-hawaii_rg30oX6C1.jpg'), alt: 'Hawaiian coastline' },
      { src: ik('travel-half-dome_E59hqHVTS.jpg'), alt: 'Half Dome, Yosemite' },
      { src: ik('travel-hawaii_H3KJ3yfxn.jpg'), alt: 'Hawaii' },
      {
        src: ik('travel-grand-tetons_P0rr5WvQpc.jpg'),
        alt: 'Grand Tetons with horses grazing'
      }
    ],
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/travel.olegchursin/'
      },
      { label: 'Unsplash', href: 'https://unsplash.com/@olegchursin_photo' }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'People in their own places, in New York and around it.',
    photos: [
      {
        src: 'https://live.staticflickr.com/65535/52403019474_be47756e14_b.jpg',
        alt: 'Lifestyle portrait 1'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403235333_656b2ee4dc_b.jpg',
        alt: 'Lifestyle portrait 2'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403235438_41a16bbef2_b.jpg',
        alt: 'Lifestyle portrait 3'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403019209_5fbe7f5fc6_b.jpg',
        alt: 'Lifestyle portrait 4'
      },
      {
        src: 'https://live.staticflickr.com/65535/52402222692_0348eddfd7_b.jpg',
        alt: 'Lifestyle portrait 5'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403019199_1062055a40_b.jpg',
        alt: 'Lifestyle portrait 6'
      }
    ],
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/lifestyle.olegchursin/'
      },
      {
        label: 'lifestyle.olegchursin.com',
        href: 'https://lifestyle.olegchursin.com'
      }
    ]
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Family sessions: kids, siblings, parents, outdoors.',
    photos: [
      { src: ik('family-yellow_mQwUi-Jgi.jpg'), alt: 'Child in a yellow coat' },
      { src: ik('family-smile_VUrFYnSw7.jpg'), alt: 'Smiling child' },
      { src: ik('family-beret_GdSXHrJPh.jpg'), alt: 'Child in a beret' },
      {
        src: ik('family-crown_UdC5oPRvOJ.jpg'),
        alt: 'Child wearing a paper crown'
      },
      { src: ik('family-hoodie_PWRBFsc56.jpg'), alt: 'Child in a hoodie' },
      { src: ik('family-siblings_GbuiWMdHpU.jpg'), alt: 'Siblings together' }
    ],
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/family.olegchursin/'
      }
    ]
  },
  {
    id: 'wedding',
    title: 'Wedding',
    description: 'Weddings and engagements, documentary style.',
    photos: [
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-JJ-008.jpg',
        alt: 'Wedding couple'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-RA-006.jpg',
        alt: 'Wedding ceremony'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-roupalina-017.jpg',
        alt: 'Wedding portrait'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-TM-005.jpg',
        alt: 'Couple portrait'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-RD-002.jpg',
        alt: 'Wedding day detail'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-MM-wed-05.jpg',
        alt: 'Wedding couple outdoors'
      }
    ],
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/wedding.olegchursin/'
      },
      {
        label: 'wedding.olegchursin.com',
        href: 'https://wedding.olegchursin.com'
      }
    ]
  }
];

export const parkSlope = {
  src: ik('park-slope_-pY7uwDVs.png'),
  alt: 'Brownstones in Park Slope, Brooklyn'
};
