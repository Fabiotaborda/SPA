export class Router {
    routes = {}

    add(routeName, page) {
      this.routes[routeName] = page
    }
  
    Route(event) {
        event = event || window.event
        event.preventDefault()
  
        window.history.pushState({}, "", event.target.href)
  
        this.handle()

        const span = document.querySelectorAll(".route")
        span.forEach(actives => {
            actives.classList.remove("active")
        })
  
        event.target.classList.add("active")
    }
  
    handle() {

        const { pathname } = window.location
  
        const route = this.routes[pathname] || this.routes["/error"]

        fetch(route)
        .then(data => data.text())
        .then(html => document.querySelector("#app").innerHTML = html)
    }
}