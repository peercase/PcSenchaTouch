class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

                "/oldindex"(view:"/oldindex")
                "/newindex"(view:"/newindex")
		"/"(view:"/index")
		"500"(view:'/error')
	}
}
