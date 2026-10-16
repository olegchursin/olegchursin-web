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
        alt: 'El Capitan and Yosemite Valley at dusk'
      },
      {
        src: ik('travel-joshue-tree_DA_GhkMIJC.jpg'),
        alt: 'Joshua tree under a purple sky at dusk'
      },
      {
        src: ik('travel-hawaii_rg30oX6C1.jpg'),
        alt: 'Fisherman silhouetted against a sunset over the ocean, Hawaii'
      },
      {
        src: ik('travel-half-dome_E59hqHVTS.jpg'),
        alt: 'Half Dome at sunset, Yosemite'
      },
      {
        src: ik('travel-hawaii_H3KJ3yfxn.jpg'),
        alt: 'Rainbow over a beach in Hawaii'
      },
      {
        src: ik('travel-grand-tetons_P0rr5WvQpc.jpg'),
        alt: 'Horses grazing in an autumn meadow below the Grand Tetons'
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
    description: 'Portraits and lifestyle sessions.',
    photos: [
      {
        src: 'https://live.staticflickr.com/65535/52403019474_be47756e14_b.jpg',
        alt: 'Woman in a black dress against a rainbow-painted brick wall'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403235333_656b2ee4dc_b.jpg',
        alt: 'Portrait of a man in a patterned shirt on a dark background'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403235438_41a16bbef2_b.jpg',
        alt: 'Portrait of a woman with windswept hair on a dark background'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403019209_5fbe7f5fc6_b.jpg',
        alt: 'Woman with long blond hair against a blue brick wall'
      },
      {
        src: 'https://live.staticflickr.com/65535/52402222692_0348eddfd7_b.jpg',
        alt: 'Woman leaning on a bridge railing in a park'
      },
      {
        src: 'https://live.staticflickr.com/65535/52403019199_1062055a40_b.jpg',
        alt: 'Red-haired woman against a blue brick wall'
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
    description: 'Family sessions, mostly kids.',
    photos: [
      {
        src: ik('family-yellow_mQwUi-Jgi.jpg'),
        alt: 'Girl in a pink dress and sun hat against a yellow wall'
      },
      {
        src: ik('family-smile_VUrFYnSw7.jpg'),
        alt: 'Close-up of a smiling blond child'
      },
      { src: ik('family-beret_GdSXHrJPh.jpg'), alt: 'Child in a red beret' },
      {
        src: ik('family-crown_UdC5oPRvOJ.jpg'),
        alt: 'Girl wearing a pink crown'
      },
      {
        src: ik('family-hoodie_PWRBFsc56.jpg'),
        alt: 'Child in a knit hoodie looking up and smiling'
      },
      {
        src: ik('family-siblings_GbuiWMdHpU.jpg'),
        alt: 'Siblings lying side by side, one in a knit hat'
      }
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
    description: 'Ceremonies, couples and wedding parties.',
    photos: [
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-JJ-008.jpg',
        alt: 'Bride in a flower crown laughing as the groom kisses her cheek'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-RA-006.jpg',
        alt: 'Bride in a veil by a bright window'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-roupalina-017.jpg',
        alt: 'Wedding party posing on a garden staircase'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-TM-005.jpg',
        alt: 'Bride and groom, with a portrait of the smiling groom'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-RD-002.jpg',
        alt: 'Wedding ceremony in a church'
      },
      {
        src: 'https://wedding.olegchursin.com/images/gallery-oleg-chursin-wedding-photography-MM-wed-05.jpg',
        alt: 'Two grooms in tuxedos standing in a doorway'
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
