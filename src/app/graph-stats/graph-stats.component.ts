import { Component, OnInit } from '@angular/core';
import {TournamentServiceService} from "../../service/tournament-service.service";
import {Stats} from "../../models/Stats";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-graph-stats',
  templateUrl: './graph-stats.component.html',
  styleUrls: ['./graph-stats.component.scss']
})
export class GraphStatsComponent implements OnInit {

  options: any;
  listStats: Stats | undefined;

  constructor(private readonly tournoiService: TournamentServiceService) { }

  ngOnInit(): void {
    this.tournoiService.getStats().subscribe(list => {
      this.listStats = list || undefined;
      console.log(list);
      this.setOptions();
    });
  }

  setOptions() {
    this.options = {
      legend: {
        data: ['matchs', 'tournois'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: this.listStats?.pseudo,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'matchs',
          type: 'bar',
          data: this.listStats?.nbMatchs,
          animationDelay: 1,
        },
        {
          name: 'tournois',
          type: 'bar',
          data: this.listStats?.nbTournois,
          animationDelay: 1,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: 1,
    };
  }

}
