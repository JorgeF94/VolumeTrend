var chart;

document.addEventListener('DOMContentLoaded', () => {
  chart = Highcharts.chart('container', {
    chart: {
      events: {
          load: function() {
              const chart = this;
              //console.log(chart);
          
              chart.series.forEach(series => {
                  const Point = series.points;
              
                  Point.forEach(points => {
                      //console.log(points);
                      const Element = points.graphic.element;
  
                      Element.setAttribute('role', 'button');
                  });
              
              });
          }
      },
    },
    
    xAxis: {
        labels: {
            enabled: true,
            formatter: function() {
                return Highcharts.dateFormat('%m/%d', this.value);
            }
        },
  },
    legend: {
        enabled: true,
        verticalAlign: 'top',
        align: 'right',
    },
    
    plotOptions: {
        series: {
            marker: {
                enabled: true
            }
        }
    },
    
    tooltip: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 4,
        borderWidth: 0,
        padding: 16,
        useHTML: true,
        shared: true,
        formatter: function() {
          const date = new Date(this.x);
          const dateLocaleString = date.toLocaleString('en-GB', {
            month: 'long',
            timeZone: 'UTC'
          });
          const dateString = `${dateLocaleString} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
    
          let tooltip = '';
          let total = 0;
    
          this.points.forEach(p => {
            const text = ` ${p.series.name}: ${p.y}`;
            //const symbol = `${p.series.symbolUnicode}`;
            const symbol = `${p.series.symbol}`;
            
            tooltip += '<div class=\'tooltip-item\'><div><span style=\'background-color:' + p.series.color + '\'></span><span style=\'color:' + p.series.color + '\'>' + symbol + '</span>' + text + '</div></div>';
            total += p.y;
          });
    
          const headerText = `${dateString}: ${total}`;
          const result = '<div class=\'tooltip-header\' style=\'font-weight: bold\'>' + headerText + '</div>' + tooltip;
    
          return result;
        }
    },
    series: [
      {
        name: 'Asia',
        data: [
            [new Date('2023-08-22').getTime(), 98 ],
            [new Date('2023-09-06').getTime(), 20 ],
            [new Date('2023-09-08').getTime(), 29 ],
			[new Date('2023-09-09').getTime(), 54 ]
        ]
      },
      {
        name: 'Australia',
        data: [
          [new Date('2023-08-22').getTime(), 103],
          [new Date('2023-09-06').getTime(), 12 ],
          [new Date('2023-09-07').getTime(), 39 ],
          [new Date('2023-09-08').getTime(), 17 ],
          [new Date('2023-09-09').getTime(), 13 ]
        ]
      },
      {
        name: 'Europe',
        data: [
          [new Date('2023-08-22').getTime(), 87 ],
          [new Date('2023-09-06').getTime(), 17 ],
          [new Date('2023-09-07').getTime(), 69 ],
          [new Date('2023-09-09').getTime(), 23 ],
          [new Date('2023-09-10').getTime(), 70 ]
        ]
      }
    ],
  },

/*
    // Função para criar os links das páginas
    function createPagination(chart) {

      var chartLength = chart.xAxis[0].categories.length;
      var recordsPerPage = 15;
      var currentPage = 0;
      var auxMaxPage = chartLength / recordsPerPage;
      var firstPage = 0;
      var lastPage = Math.ceil(auxMaxPage) - 1;
      var minExtreme = 0;
      var maxExtreme = recordsPerPage;

      const pageLinksContainer = document.getElementById("pageLinks");

      if (lastPage > 0) {
        InitPagination();
        CheckPagination();
      }

      function InitPagination() {
        // Cria o element "prev"
        const prevLink = document.createElement("a");
        prevLink.setAttribute("id", "btn1");
        prevLink.href = "#";
        prevLink.classList.add("prev");
        prevLink.textContent = "‹"; // Unicode para seta para a esquerda
        prevLink.onclick = function () {
          currentPage = currentPage - 1;
          goToPage(currentPage);
          return false;
        };

        pageLinksContainer.appendChild(prevLink);

        // Cria os links das páginas numeradas
        for (let i = 0; i <= lastPage; i++) {
          const pageLink = document.createElement("a");
          pageLink.href = "#";
          pageLink.setAttribute("id", "page" + i);
          pageLink.classList.add("page");
          if (i == 0) {
            addClass(pageLink, "active");
          }
          pageLink.textContent = i + 1;
          pageLink.onclick = function () {
            goToPage(i);
            return false;
          };

          pageLinksContainer.appendChild(pageLink);
        }

        // Cria o element "next"
        const nextLink = document.createElement("a");
        nextLink.setAttribute("id", "btn2");
        nextLink.href = "#";
        nextLink.classList.add("next");
        nextLink.textContent = "›"; // Unicode para seta para a direita
        nextLink.onclick = function () {
          currentPage = currentPage + 1;
          goToPage(currentPage);
          return false;
        };

        pageLinksContainer.appendChild(nextLink);

      }

      // Função para ir para uma página específica
      function goToPage(pageNumber) {
        currentPage = pageNumber;
        minExtreme = pageNumber * recordsPerPage;
        maxExtreme = minExtreme + recordsPerPage - 1;
        for (let i = 0; i <= lastPage; i++) {
          removeClass(document.getElementById("page" + i), "active");
        }
        addClass(document.getElementById("page" + pageNumber), "active");
        chart.xAxis[0].setExtremes(minExtreme, maxExtreme);
        CheckPagination();
      }

      function CheckPagination() {
        if (lastPage > 0) {
          if (currentPage == firstPage) {
            addClass(document.getElementById("btn1"), "disabled");
            removeClass(document.getElementById("btn2"), "disabled");
          } else
            if (currentPage == lastPage) {
              removeClass(document.getElementById("btn1"), "disabled")
              addClass(document.getElementById("btn2"), "disabled");
            } else {
              removeClass(document.getElementById("btn1"), "disabled")
              removeClass(document.getElementById("btn2"), "disabled")
            }
        } else {
          addClass(document.getElementById("btn1"), "disabled");
          addClass(document.getElementById("btn2"), "disabled");
        }
      }
      function removeStyle(element, style) {
        if (element && element.style) {
          element.style[style] = "";
        }
      }
      function addClass(element, CssClass) {
        // Verifique se o element existe
        if (element && element.classList) {
          // Use o método add() para adicionar a CssClass
          element.classList.add(CssClass);
        }
      }
      function removeClass(element, CssClass) {
        // Verifique se o element existe
        if (element && element.classList) {
          // Use o método add() para remover a CssClass
          element.classList.remove(CssClass);
        }
      }

    }
    */
  )
});

