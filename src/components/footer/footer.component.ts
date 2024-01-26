import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  hoveringElement: string = '';
  hoveringId: string = '';
  colorStack: any = {
    email: '#fff',
    linkedIn: '#2159ba',
    github: '#cfd1d0',
    whatsapp: '#116937',
    instagram: '#ae3d79',
  };
  socialPlatformData: any = [
    {
      name: 'Email',
      id: 'anupam.mishra345@gmail.com',
      link: 'mailto:anupam.mishra345@gmail.com',
      icons: 'fa-solid fa-envelope',
      color: '#ffffff',
    },
    {
      name: 'LinkedIn',
      id: '@anupam-pramod-mishra',
      link: 'https://www.linkedin.com/in/anupam-pramod-mishra/',
      icons: 'fa-brands fa-linkedin-in',
      color: '#2159ba',
    },
    {
      name: 'Github',
      id: '@anupam-mishra345',
      link: 'https://github.com/anupam-mishra345',
      icons: 'fa-brands fa-github',
      color: '#ffffff',
    },
    {
      name: 'Whatsapp',
      id: '@(+91)-7747852594',
      link: 'https://wa.me/917747852594',
      icons: 'fa-brands fa-whatsapp',
      color: '#317d70',
    },
    {
      name: 'Instagram',
      id: '@anupam.mishra315',
      link: 'https://www.instagram.com/anupam.mishra315/',
      icons: 'fa-brands fa-instagram ',
      color: '#ae3d79',
    },
  ];

  enableHovering(platform: string, id: string) {
    this.hoveringElement = platform;
    this.hoveringId = id;
  }
  disableHovering() {
    this.hoveringElement = '';
    this.hoveringId = '';
  }
  getStackColor(social: string) {
    if (social === '') {
      return this.socialPlatformData.filter(
        (elem: any) => elem.name === this.hoveringElement
      )[0].color;
    } else {
      return this.socialPlatformData.filter(
        (elem: any) => elem.name === social
      )[0].color;
    }
  }
}
