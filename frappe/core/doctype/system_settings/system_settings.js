frappe.ui.form.on("System Settings", "refresh", function(frm) {
	frappe.setup_language_field(frm);
	frappe.call({
		method: "frappe.core.doctype.system_settings.system_settings.load",
		callback: function(data) {
			frappe.all_timezones = data.message.timezones;
			frm.set_df_property("time_zone", "options", frappe.all_timezones);

			$.each(data.message.defaults, function(key, val) {
				frm.set_value(key, val);
				sys_defaults[key] = val;
			})
		}
	});
});

// Update Bed availability on percentage change
frappe.ui.form.on("System Settings", "validate", function(frm) {
	frappe.call({
		method: "hospital_bed_management.hospital_bed_management.doctype.hospital_registration.hospital_registration.update_bed_availability",
		args:{
			"i_percent": frm.doc.i_reserved_bed_percents,
			"w_percent": frm.doc.w_reserved_bed_percents
		},
		callback: function(r) {
			console.log("Done!!!")
		}
	});
});