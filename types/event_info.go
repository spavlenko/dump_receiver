package types

type Application struct {
	CmdParameters  string `json:"cmd_parameters"`
	ProductName    string `json:"app_name"`
	ProductVersion string `json:"app_version"`
}

type Event struct {
	EventType      string `json:"event_type"`
	ExceptionCode  int    `json:"exception_code"`
	ExceptionDescr string `json:"exception_description"`
	ProcessId      int    `json:"process_id"`
	EventTimeUnix  int    `json:"event_time"`
	ExecutableName string `json:"executable_name"`
	FailureFile    string `json:"file"`
	FailureFunc    string `json:"function"`
	FailureLine    int    `json:"line"`
	Expression     string `json:"expression"`
	Message        string `json:"message"`
	StackTrace     string `json:"stack_trace"`
}

type EventInfo struct {
	ID              int         `json:"key"`
	EventInfo       Event       `json:"event_info"`
	ApplicationInfo Application `json:"application_info"`

	UserId       string `json:"user_id"`
	UserName     string `json:"user_name"`
	ComputerName string `json:"computer_name"`
	OsName       string `json:"os_name"`
}

type EventsCollection struct {
	Events []EventInfo `json:"events"`
}
