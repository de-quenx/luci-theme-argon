local m = Map("argon", "Argon Theme Style")

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
gaya_theme.default = "dark"

gaya_theme.depends = {
    mode = "dark"
}

primary = s:option(Value, "primary", "Primary Color")
primary.placeholder = "#3f5582"
primary.default = "#3f5582"

return m
