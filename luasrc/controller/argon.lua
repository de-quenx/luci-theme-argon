module("luci.controller.argon", package.seeall)

function index()
    entry({"admin", "system", "argon"}, cbi("argon"), "Argon Theme Style", 49)
end
