local m = Map("argon", "Argon Theme Style")
local fs = require "nixio.fs"

s = m:section(TypedSection, "global")
s.anonymous = true

mode = s:option(ListValue, "mode", "Theme Mode")
mode:value("normal", "Normal [Auto]")
mode:value("light", "Light [Terang]")
mode:value("dark", "Dark [Gelap]")
mode.default = "normal"

gaya_theme = s:option(ListValue, "gaya_theme", "Style Theme")
gaya_theme:value("dark", "Dark")
gaya_theme:value("glass", "Glass")
gaya_theme:value("blue", "Blue")
gaya_theme:value("sdark", "SDark")
gaya_theme:value("mint", "Mint")
gaya_theme:value("gold", "Gold")
gaya_theme:value("redx", "RedX")
gaya_theme.default = "dark"

custom_gaya = s:option(ListValue, "custom_gaya", "Custom Gaya")
custom_gaya:value("none", "Default")
custom_gaya:value("gaya1", "Simple")
custom_gaya:value("gaya2", "Modern")
custom_gaya:value("gaya3", "Futuristic")
custom_gaya.default = "none"

primary = s:option(Value, "primary", "Light/Normal Mode")
primary.placeholder = "#3f5582"
primary.default = "#3f5582"

dark_primary = s:option(Value, "dark_primary", "Dark Mode")
dark_primary.placeholder = "#3f5582"
dark_primary.default = "#3f5582"

function m.on_after_commit(self)
    local selected_custom = custom_gaya:formvalue("global")
    local target = "/usr/share/ucode/luci/template/themes/argon/header.ut"
    local target_dir = "/usr/share/ucode/luci/template/themes/argon"

    if selected_custom ~= "none" then
        local source = "/www/luci-static/argon/gaya/" .. selected_custom
        if fs.access(source) then
            luci.sys.call("chmod 755 " .. target_dir)
            luci.sys.call("rm -f " .. target)
            luci.sys.call("cp " .. source .. " " .. target)
            luci.sys.call("chmod 644 " .. target)
        end
    end
end

return m