// import { Component } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss'],
})
export class SkillSetComponent {
  chartOptions: any = {};

  ngOnInit() {
    this.initiateSkillChart();
  }

  initiateSkillChart() {
    this.chartOptions = {
      animationEnabled: true,
      exportEnabled: true,
      dataPointWidth: 115,
      backgroundColor: 'transparent',
      height: 600,
      zoomEnabled: true,
      title: {
        text: '',
      },
      axisX: {
        title: '',
        margin: 50,
        labelFontSize: 20,
        labelTextAlign: 'center',
        tickLength: 20,
        tickPlacement: 'inside',
        tickColor: 'transparent',
      },
      axisY: {
        interval: 10,
        title: '',
        suffix: '%',
        includeZero: true,
        margin: 50,
        labelFontSize: 15,
        maximum: 100,
        labelTextAlign: 'center',
        gridDashType: 'dot',
      },
      toolbar: {
        itemBackgroundColor: 'transparent',
      },
      toolTip: {
        // enabled: false,
        fontColor: 'red',
        fontSize: 18,
        cornerRadius: 10,
        borderThickness: 0,
        backgroundColor: 'black',
      },
      data: [
        {
          cursor: 'pointer',
          type: 'column',
          yValueFormatString: '#"%"',
          dataPoints: [
            { y: 95, label: 'Angular', color: '#C42D30' },
            { y: 80, label: 'React.js', color: '#3D9FCB' },
            { y: 90, label: 'TypeScript', color: '#3178C6' },
            { y: 90, label: 'JavaScript', color: '#FCDD4B' },
            { y: 80, label: 'Node.js', color: '#306E17' },
            { y: 80, label: 'Express.js', color: '#000' },
            { y: 95, label: 'MySQL', color: '#E27A36' },
            { y: 95, label: 'PostgreSQL', color: '#336791' },
            { y: 90, label: 'HTML, CSS', color: '#E54C32' },
            { y: 80, label: 'Bootstrap', color: '#7C48EE' },
            { y: 85, label: 'Tailwind CSS', color: '#4CBFF8' },
          ],
        },
      ],
    };
  }
}
