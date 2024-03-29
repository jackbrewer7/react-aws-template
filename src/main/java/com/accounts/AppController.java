package com.accounts;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class AppController {
	
	@RequestMapping({"/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"})
	public String loadUI() {
		log.info("loading UI");
		return "forward:/index.html";
	}

}