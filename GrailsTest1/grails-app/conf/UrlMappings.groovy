class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/oldindex"(view:"/oldindex.gsp")
		"/newindex"(view:"/newindex.gsp")
        "/foo"(view:'/index')
		"/"(view:"/index")

		"500"(view:'/error')
	}
}
