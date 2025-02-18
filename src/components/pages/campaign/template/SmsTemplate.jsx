import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import brideandgroomFields from '../../../../utils/JSON/BrideandGroomField';
import parse from 'html-react-parser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CampaignServices from '../../../../services/CampaignServices';
import Swal from 'sweetalert2';
import ButtonLoader from '../../../../utils/Loader/ButtonLoader';
import customContext from '../../../../contexts/Context';
import TemplateListing from './TemplateListing';
import ValidateAuthenticationKey from '../../../../utils/ValidationAuthenticationKey';
const SmsTemplate = () => {
    const [text, setText] = useState("");
    const [textErr, setTextErr] = useState("")
    const [brideandgroomFieldsList, setBrideGroomFieldList] = useState(brideandgroomFields || [])
    const [title, setTitle] = useState("")
    const [titleErr, setTitleErr] = useState("")
    const queryClient = useQueryClient()
    const [editId, setEditId] = useState("")
    const [editDetails, setEditDetails] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4


    const handleEditSms = (e, id, data) => {
        setEditId(id)
        setEditDetails(data)
        setTitle(data?.title)
        setText(data?.body)

    }

    const handleAddField = (e, field) => {
        // Check if the text already contains a <p> tag
        // let updatedText = text;

        let updatedText = text.replace(/<\/?p>/g, "");

        // Append the field in bold if text already exists
        if (updatedText.trim()) {
            updatedText += ` {{${field.value}}}`;
        } else {
            // If the text is empty, just add the field
            updatedText = `{{${field.value}}}`;
        }

        // Update the text state
        setText(updatedText);

        // Update the brideandgroomFieldsList with the new count and selected state
        const find = brideandgroomFieldsList?.map((each) => {
            if (each.value === field?.value) {
                return {
                    ...each, // Spread the original object to maintain other properties
                    count: each.count + 1,
                    selected: true
                };
            }
            return each; // Return unchanged items if they don't match
        });

        setBrideGroomFieldList(find);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) {
            setTitleErr("Required")
            return
        }

        if (title.length > 50) {
            setTitleErr("Exceed")
            return
        }
        if (!text) {
            setTextErr("Required")
            return
        }
        if (text.length > 180) {
            setTextErr("Exceed")
            return
        }


        const sendData = {
            title: title,
            body: text,
          

        }
        if (editId) {
            sendData.id = editId
            SmsTemplateMutateUpdate.mutate(sendData)
            return

        }


        SmsTemplateMutate.mutate(sendData)



    }

    const handleChange = (e) => {
        setTitle(e.target.value)
        setTitleErr("")

    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const SmsTemplateMutate = useMutation(
        (data) => CampaignServices.SmsTemplate(data),
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Added Successfully ",
                    icon: "success",
                });


                setText("")
                setTextErr("")
                setTitle("")
                setTitleErr("")
                setEditDetails("")
                setEditId("")
                setBrideGroomFieldList(brideandgroomFields)
                queryClient.refetchQueries("sms-template-list");

            },
            onError: (err) => {
                const msg = !!err.response?.data?.tenant[0]
                    ? err.response?.data?.tenant[0]
                    : err?.response?.data?.host[0];

                Swal.fire({
                    title: "Error",
                    text: msg || err?.message,
                    icon: "error",
                });
                return;
            },
        }
    );
    const SmsTemplateMutateUpdate = useMutation(
        (data) => CampaignServices.SmsTemplateUpdate(data),
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Succssfull",
                    text: "Updated Successfully ",
                    icon: "success",
                });


                setText("")
                setTextErr("")
                setTitle("")
                setTitleErr("")
                setEditDetails("")
                setEditId("")
                setBrideGroomFieldList(brideandgroomFields)
                queryClient.refetchQueries("sms-template-list");

            },
            onError: (err) => {
                const msg = !!err.response?.data?.tenant[0]
                    ? err.response?.data?.tenant[0]
                    : err?.response?.data?.host[0];

                Swal.fire({
                    title: "Error",
                    text: msg || err?.message,
                    icon: "error",
                });
                return;
            },
        }
    );


    const {
        data: EmailTemplateList,
        isLoading: isEmailTemplateLoad,
        isError,
        error,
        refetch,
    } = useQuery(
        ["sms-template-list", currentPage],
        () => {

            let queryParams = [];

          
            if (currentPage) {
                queryParams.push('page=' + currentPage);
            }
            if (pageSize) {
                queryParams.push('page_size=' + pageSize);
            }


            const formattedQueryParams = queryParams.length ? '?' + queryParams.join('&') : '';


            return CampaignServices.SmsTemplateList(formattedQueryParams)
        },
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {



            },
            onError: (err) => {
                if (err?.response?.status == 401) {
                    ValidateAuthenticationKey(
                        err?.response?.status,
                        "Your login session has expired. Please log in again."
                    );
                    return;
                }
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.message || err?.message,
                    icon: "error",
                });
            },
        }
    );



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                // resetTimer()
                deleteCampaignTemplate.mutate({ id: id });
            }
        });
    };


    const deleteCampaignTemplate = useMutation(
        (formdata) => {
            return CampaignServices.DeleteSmsTemplate(formdata);
        },
        {
            onSuccess: (data) => {
                Swal.fire({
                    title: "Successfull",
                    text: "Deleted",
                    icon: "success",
                });
                // queryClient.invalidateQueries("subscription-organization");
                currentPage == 1 ? queryClient.refetchQueries("sms-template-list") : queryClient.refetchQueries(["sms-template-list", 1]);
                setCurrentPage(1)
            },
            onError: (err) => {
                Swal.fire({
                    title: "Error",
                    text: err?.response?.data?.error || err?.message,
                    icon: "error",
                });
                // alert(err?.response?.data?.error || err?.message);
            },
        }
    );

    const handleTextChange = (e) => {
        setText(e.target.value)

    }



    return (
        <Row>
            <Col md="12" className='mb-2 mt-2'>
                <FormGroup className="common-formgroup">
                    <Label>Template Title</Label>
                    <Input
                        id="exampleEmail"
                        name="account_sid"
                        onChange={handleChange}

                        value={title}
                        placeholder="Template Title"
                        type="text"
                    />
                    {titleErr && <p className="text-danger">
                        {titleErr}
                    </p>}
                </FormGroup>

            </Col>
            <Col md="12 mb-2">
                <div className="sms-email-variable-wrap">
                    <ul>
                        {
                            brideandgroomFieldsList?.map((each) => {
                                return <li className='sms-email-variable-list'><Button onClick={(e) => handleAddField(e, each)} for="Religion" className={each.selected ? 'btn purple-btn' : 'btn purple-btn'}>
                                    {each.field}
                                </Button></li>
                            })
                        }


                    </ul>
                </div>


            </Col>


            <Col md="12" className="mb-2">
                {/* <Label>Content *</Label>

                <FormGroup className="common-formgroup">
                    <Editor
                        text={text}
                        setText={setText}
                        handleEditorChange={handleEditorChange}
                    />
                    {text?.length || 0}/180
                </FormGroup>
                {textErr && <p className="text-danger">
                    {textErr}
                </p>} */}

                <div className='campaign-body-wrap'>
                    <FormGroup className='common-formgroup'>
                        <Label>Content *</Label>
                        <Input
                            id=""
                            name=""
                            value={text}
                            onChange={handleTextChange}
                            rows="8"

                            placeholder="Content"
                            type="textarea"
                        />
                        {text?.length || 0}/180
                        {textErr && <p className="text-danger">
                            {textErr}
                        </p>}


                    </FormGroup>


                </div>

            </Col>
            <Col md="12" className="mb-2">
                <FormGroup className='common-formgroup'>
                    <Button type="submit" onClick={handleSubmit} disabled={SmsTemplateMutate?.isLoading || SmsTemplateMutateUpdate.isLoading} className='btn btn-style1'>{SmsTemplateMutate?.isLoading || SmsTemplateMutateUpdate.isLoading ? <ButtonLoader /> : editId ? "Update Template" : "Create Template"}</Button>
                </FormGroup>
            </Col>

            <Col md="12" className='mb-2'>

                <TemplateListing handleEdit={handleEditSms} deleteCampaignTemplate={deleteCampaignTemplate} currentPage={currentPage} TemplateList={EmailTemplateList} isLoad={isEmailTemplateLoad} handlePageChange={handlePageChange} handleDelete={handleDelete} pageSize={pageSize} />
            </Col>



        </Row>
    )
}


export default SmsTemplate