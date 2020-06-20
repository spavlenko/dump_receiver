package types

type EventInfo struct {
	ProductName    string `json:"product_name"`
	ProductVersion string `json:"product_version"`
	ExecutableName string `json:"executable_name"`
	UserId         string `json:"user_id"`
	EventType      string `json:"event_type"`
	ExceptionCode  int    `json:"exception_code"`
	FailureFile    string `json:"failure_file"`
	FailureFunc    string `json:"failure_func"`
	FailureLine    int    `json:"failure_line"`
	Expression     string `json:"expression"`
	Description    string `json:"description"`
	EventTimestamp string `json:"timestamp"`
}
