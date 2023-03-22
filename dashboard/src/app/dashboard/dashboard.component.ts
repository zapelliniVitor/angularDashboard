import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DadosService } from './service/dados.service';
declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      })
  }
  /**
   * Inicializa a API de gráficos com 1 segundo de delay para permitir a integração da API com o Angular
   * @return void
   */
  private init(): void {
    if (typeof (google) !== "undefined") {
      google.charts.load('current', { 'packages': ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * Método chamado asim que a API de gráficos é inicializada,
   * responsável por chamar os métodos geradores dos gráficos
   * @returns void
   */
  private exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirDonutChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
  }

  // Exipe o gráfico Pie Chart
  private exibirPieChart(): void {
    const chart = new google.visualization.PieChart(document.getElementById("pie_chart"));

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  // Exipe o gráfico 3D Pie Chart
  private exibir3dPieChart(): void {
    const chart = new google.visualization.PieChart(document.getElementById("3d_pie_chart"));
    const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  }

  // Exipe o gráfico Donut
  private exibirDonutChart(): void {
    const chart = new google.visualization.PieChart(document.getElementById("donut_chart"));
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.4;
    chart.draw(this.obterDataTable(), opcoes);
  }

  // Exipe o gráfico Bar
  private exibirBarChart(): void {
    const chart = new google.visualization.BarChart(document.getElementById("bar_chart"));

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  // Exipe o gráfico Line
  private exibirLineChart(): void {
    const chart = new google.visualization.LineChart(document.getElementById("line_chart"));

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  // Exipe o gráfico Bar
  private exibirColumnChart(): void {
    const chart = new google.visualization.ColumnChart(document.getElementById("column_chart"));

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Cria e retorna o objeto DataTable da API de gráficos,
   * responsável por definis os dados dos gráficos
   * @returns any
   */
  private obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  /**
   * Retorna as opções do gráfico, sendo titulo e tamanho
   *
   * @retunrs any
   */
  private obterOpcoes(): any {
    return {
      'title': 'Quantidade de cadastros primeiro semestre',
      'width': 400,
      'height': 300
    };
  }
}
