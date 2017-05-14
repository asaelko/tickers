(function () {
    this.App || (this.App = {});

    App.graph = {
        config: {},
        data: [],

        init: function (currency, svg_id) {
            var app = this;
            app.config.currency = currency;
            app.config.svg = d3.select(svg_id);
            app.config.margin = {top: 20, right: 20, bottom: 20, left: 40};
            app.config.width = +app.config.svg.attr("width") - app.config.margin.left - app.config.margin.right;
            app.config.height = +app.config.svg.attr("height") - app.config.margin.top - app.config.margin.bottom;

            app.config.g = app.config.svg
                .append("g")
                .attr("transform", "translate(" + app.config.margin.left + "," + app.config.margin.top + ")");

            app.config.line = d3.line()
                .x(function (d, i) {
                    return app.config.x(i);
                })
                .y(function (d, i) {
                    return app.config.y(d);
                });

            app.config.g.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", app.config.width)
                .attr("height", app.config.height);
        },

        draw: function (data) {
            var app = this;
            app.data = data;

            var scale = app.data.max() - app.data.min();
            if (scale === 0){
                scale = app.data.max() * 0.1;
            }

            app.config.x = d3.scaleLinear()
                .domain([0, app.data.length - 1])
                .range([0, app.config.width]);

            app.config.y = d3.scaleLinear()
                .domain([app.data.min() - (scale * 0.5), app.data.max() + (scale * 0.5)])
                .range([app.config.height, 0]);

            app.config.g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(app.config.y));

            app.config.g.append("g")
                .attr("clip-path", "url(#clip)");

            var path = app.config.g.append("g")
                .attr("clip-path", "url(#clip)")
                .append("path")
                .datum(data)
                .attr("class", "line")
                .transition()
                .ease(d3.easeLinear).on('start', function() {
                    app.config.path = this;
                    d3.select(app.config.path)
                        .attr("d", app.config.line)
                        .attr("transform", null);
                });
        },

        tick: function (point) {
            var app = this;
            if(point.currency !== app.config.currency)
                return;

            app.data.push(Number(point.rate));

            // Redraw the line
            // Slide it to the left
            d3.select(app.config.path)
                .attr("d", app.config.line)
                .attr("transform", null)
                .transition()
                .duration(500)
                .attr("transform", "translate(" + app.config.x(-1) + ",0)");

            app.data.shift();

            var scale = app.data.max() - app.data.min();
            if (scale === 0){
                scale = app.data.max() * 0.1;
            }

            app.config.y = d3.scaleLinear()
                .domain([app.data.min() - (scale * 0.5), app.data.max() + (scale * 0.5)])
                .range([app.config.height, 0]);

            app.config.g
                .select(".axis.axis--y")
                .transition()
                .duration(500)
                .call(d3.axisLeft(app.config.y));

        }
    }

}).call(this);
