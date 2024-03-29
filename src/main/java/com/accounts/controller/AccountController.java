package com.accounts.controller;

import com.accounts.dao.AccountDao;
import com.accounts.model.Account;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountException;
import javax.security.auth.login.FailedLoginException;

/**
 * The class used as the REST controller for accounts (and friends).
 * The AccountDao object is autowired in as a singleton to
 * ensure the proper credentials are used each time an API is
 * called.
 *
 * For more information on the specific API calls, see the AccountDao
 * class. This class mainly serves as the HTTP API gateway and logger.
 *
 * @author Mark Farber
 */
@Slf4j
@RestController
@RequestMapping("/api/")
public class AccountController {

    @Autowired
    private AccountDao accountDao;

    @PostMapping(path = "/account")
    @ResponseBody
    public Account createAccount(@RequestParam String username, @RequestParam String email, @RequestParam String password) throws AccountException {
        log.info("AccountController: create account");
        return accountDao.createAccount(username, email, password);
    }


    @GetMapping(path = "/login")
    @ResponseBody
    public Account login(@RequestParam String email, @RequestParam String password) throws FailedLoginException {
        log.info("AccountController: login");
        return accountDao.login(email, password);
    }

    /*
    @PostMapping(path = "/friend/add")
    @ResponseBody
    public void addFriend(@RequestParam String userEmail, @RequestParam String friendEmail) throws AccountException {
        log.info("AccountController: add friend");
        accountDao.addFriend(userEmail, friendEmail);
    }

    @PostMapping(path = "/friend/remove")
    @ResponseBody
    public void removeFriend(@RequestParam String userEmail, @RequestParam String friendEmail) {
        log.info("AccountController: remove friend");
        accountDao.removeFriend(userEmail, friendEmail);
    }

     */
}