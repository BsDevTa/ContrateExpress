const WHATSAPP_NUMBER = "5571988221221";
const THEME_STORAGE_KEY = "contrateexpress-theme";

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const themeSwitch = document.querySelector('#themeSwitch');
  const themeSwitchLabel = themeSwitch?.querySelector('.theme-switch__label');
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const backToTop = document.querySelector('[data-back-to-top]');
  const recruitmentForm = document.querySelector('[data-recruitment-form]');
  const feedback = document.querySelector('[data-form-feedback]');
  const salaryField = recruitmentForm?.querySelector('[name="salario"]');
  const benefitsSelect = document.querySelector('[data-benefits-select]');
  const benefitsTrigger = benefitsSelect?.querySelector('[data-benefits-trigger]');
  const benefitsDropdown = benefitsSelect?.querySelector('[data-benefits-dropdown]');
  const benefitsSummary = benefitsSelect?.querySelector('[data-benefits-summary]');
  const benefitsTags = benefitsSelect?.querySelector('[data-benefits-tags]');
  const benefitCheckboxes = benefitsSelect ? Array.from(benefitsSelect.querySelectorAll('input[name="beneficios"]')) : [];
  const tabsRoot = document.querySelector('[data-tabs]');
  const accordion = document.querySelector('[data-accordion]');
  const mentoringWhatsAppLink = document.querySelector('[data-whatsapp-mentoring]');
  const mentoringWhatsAppMessage = 'Olá! Conheci a ContrateExpress pelo site e gostaria de receber mais informações para contratar a mentoria profissional de RH.';

  const buildWhatsAppUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const applyTheme = (theme) => {
    const nextTheme = theme === 'olive-light' ? 'olive-light' : 'dark';
    const isDark = nextTheme === 'dark';

    root.dataset.theme = nextTheme;
    themeSwitch?.setAttribute('aria-checked', String(isDark));

    if (themeSwitchLabel) {
      themeSwitchLabel.textContent = isDark ? 'Tema escuro' : 'Tema oliva';
    }
  };

  const getCurrentTheme = () => (root.dataset.theme === 'olive-light' ? 'olive-light' : 'dark');

  const toggleTheme = () => {
    const nextTheme = getCurrentTheme() === 'dark' ? 'olive-light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  const openWhatsApp = (message) => {
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const bindWhatsAppLink = (link, message) => {
    if (!link) return;
    link.setAttribute('href', buildWhatsAppUrl(message));
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openWhatsApp(message);
    });
  };

  const closeBenefitsDropdown = ({ returnFocus = false } = {}) => {
    if (!benefitsSelect || !benefitsTrigger || !benefitsDropdown) return;
    benefitsDropdown.hidden = true;
    benefitsTrigger.setAttribute('aria-expanded', 'false');
    benefitsSelect.closest('.field')?.classList.remove('is-open');
    if (returnFocus) {
      benefitsTrigger.focus();
    }
  };

  bindWhatsAppLink(mentoringWhatsAppLink, mentoringWhatsAppMessage);

  applyTheme(getCurrentTheme());

  if (themeSwitch) {
    themeSwitch.addEventListener('click', toggleTheme);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const selector = button.getAttribute('data-scroll-target');
      const target = selector ? document.querySelector(selector) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const setActiveLink = (id) => {
    const activeLink = navLinks.find((link) => link.getAttribute('href') === `#${id}`);
    if (!activeLink) return;

    navLinks.forEach((link) => {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    });

    activeLink.classList.add('is-active');
    activeLink.setAttribute('aria-current', 'page');
  };

  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      rootMargin: '-35% 0px -50% 0px',
      threshold: 0.05,
    });

    sections.forEach((section) => activeObserver.observe(section));
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  const handleHeaderState = () => {
    const scrolled = window.scrollY > 12;
    header?.classList.toggle('is-scrolled', scrolled);
    backToTop?.classList.toggle('is-visible', window.scrollY > 700);
  };

  handleHeaderState();
  window.addEventListener('scroll', handleHeaderState, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  if (tabsRoot) {
    const tabs = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabsRoot.querySelectorAll('[role="tabpanel"]'));

    const activateTab = (tabName) => {
      tabs.forEach((tab) => {
        const isSelected = tab.dataset.tab === tabName;
        tab.setAttribute('aria-selected', String(isSelected));
      });

      panels.forEach((panel) => {
        const isPanel = panel.dataset.panel === tabName;
        panel.hidden = !isPanel;
        panel.classList.toggle('is-active', isPanel);
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab.dataset.tab));
      tab.addEventListener('keydown', (event) => {
        const nextIndex = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : null;
        if (nextIndex === null) return;
        event.preventDefault();
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex].dataset.tab);
      });
    });
  }

  const formatCurrency = (digits) => {
    if (!digits) return '';
    const amount = Number(digits) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\u00A0/g, ' ');
  };

  const getSalaryCents = () => Number(String(salaryField?.value || '').replace(/\D/g, '') || 0);

  const setFieldError = (field, message = '') => {
    if (!field) return;
    const fieldWrapper = field.closest('.field');
    const error = fieldWrapper?.querySelector('[data-field-error]');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    fieldWrapper?.classList.toggle('is-invalid', Boolean(message));
    if (error) error.textContent = message;
  };

  const clearFormErrors = () => {
    if (!recruitmentForm) return;
    recruitmentForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => setFieldError(field));
    if (feedback) {
      feedback.textContent = '';
      feedback.classList.remove('is-error');
    }
  };

  const getSelectedBenefits = () => benefitCheckboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);

  const renderBenefits = () => {
    if (!benefitsSummary || !benefitsTags) return;

    const selectedBenefits = getSelectedBenefits();
    benefitsSummary.textContent = selectedBenefits.length ? selectedBenefits.join(', ') : 'Selecione os benefícios';
    benefitsTags.replaceChildren();

    if (!selectedBenefits.length) {
      const empty = document.createElement('span');
      empty.className = 'benefits-select__empty';
      empty.textContent = 'Nenhum benefício informado';
      benefitsTags.append(empty);
      return;
    }

    selectedBenefits.forEach((benefit) => {
      const tag = document.createElement('span');
      tag.className = 'benefits-select__tag';
      tag.textContent = benefit;

      const removeButton = document.createElement('button');
      removeButton.className = 'benefits-select__tag-remove';
      removeButton.type = 'button';
      removeButton.textContent = '×';
      removeButton.setAttribute('aria-label', `Remover ${benefit}`);
      removeButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const checkbox = benefitCheckboxes.find((item) => item.value === benefit);
        if (checkbox) checkbox.checked = false;
        renderBenefits();
        benefitsTrigger?.focus();
      });

      tag.append(removeButton);
      benefitsTags.append(tag);
    });
  };

  const openBenefitsDropdown = () => {
    if (!benefitsSelect || !benefitsTrigger || !benefitsDropdown) return;
    benefitsDropdown.hidden = false;
    benefitsTrigger.setAttribute('aria-expanded', 'true');
    benefitsSelect.closest('.field')?.classList.add('is-open');
  };

  const toggleBenefitsDropdown = () => {
    const isOpen = benefitsTrigger?.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeBenefitsDropdown();
    } else {
      openBenefitsDropdown();
    }
  };

  if (benefitsSelect && benefitsTrigger && benefitsDropdown) {
    renderBenefits();
    closeBenefitsDropdown();

    benefitsTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleBenefitsDropdown();
    });
    benefitsSelect.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || benefitsTrigger.getAttribute('aria-expanded') !== 'true') return;
      event.preventDefault();
      event.stopPropagation();
      closeBenefitsDropdown({ returnFocus: true });
    });

    benefitsDropdown.addEventListener('keydown', (event) => {
      const currentIndex = benefitCheckboxes.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeBenefitsDropdown({ returnFocus: true });
      }
      if (event.key === 'ArrowDown' && currentIndex >= 0) {
        event.preventDefault();
        benefitCheckboxes[(currentIndex + 1) % benefitCheckboxes.length]?.focus();
      }
      if (event.key === 'ArrowUp' && currentIndex >= 0) {
        event.preventDefault();
        benefitCheckboxes[(currentIndex - 1 + benefitCheckboxes.length) % benefitCheckboxes.length]?.focus();
      }
    });

    benefitCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
        renderBenefits();
        closeBenefitsDropdown({ returnFocus: true });
      });
    });

    document.addEventListener('click', (event) => {
      if (benefitsTrigger.getAttribute('aria-expanded') === 'true' && !benefitsSelect.contains(event.target)) {
        closeBenefitsDropdown();
      }
    });

    document.addEventListener('focusin', (event) => {
      if (benefitsTrigger.getAttribute('aria-expanded') === 'true' && !benefitsSelect.contains(event.target)) {
        closeBenefitsDropdown();
      }
    });

    document.addEventListener('focus', (event) => {
      if (benefitsTrigger.getAttribute('aria-expanded') === 'true' && !benefitsSelect.contains(event.target)) {
        closeBenefitsDropdown();
      }
    }, true);

    recruitmentForm?.addEventListener('focusin', (event) => {
      if (benefitsTrigger.getAttribute('aria-expanded') === 'true' && !benefitsSelect.contains(event.target)) {
        closeBenefitsDropdown();
      }
    });
  }

  if (salaryField) {
    salaryField.addEventListener('keydown', (event) => {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey) return;
      if (event.key.length === 1 && !/\d/.test(event.key)) {
        event.preventDefault();
      }
    });

    salaryField.addEventListener('input', () => {
      const digits = salaryField.value.replace(/\D/g, '');
      salaryField.value = formatCurrency(digits);
      setFieldError(salaryField);
      if (feedback) {
        feedback.textContent = '';
        feedback.classList.remove('is-error');
      }
    });
  }

  if (recruitmentForm) {
    const requiredFields = [
      { name: 'vaga', message: 'Informe a vaga aberta.' },
      { name: 'area', message: 'Selecione a área profissional.' },
      { name: 'nivel', message: 'Selecione o nível da vaga.' },
      { name: 'salario', message: 'Informe o salário base.' },
      { name: 'contratacao', message: 'Selecione a forma de contratação.' },
      { name: 'modalidade', message: 'Selecione a modalidade.' },
      { name: 'carga', message: 'Selecione a carga horária semanal.' },
      { name: 'urgencia', message: 'Selecione a urgência.' },
      { name: 'quantidade', message: 'Informe a quantidade de profissionais.' },
    ];

    recruitmentForm.querySelectorAll('input, select, textarea').forEach((field) => {
      const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
      field.addEventListener(eventName, () => {
        setFieldError(field);
        if (feedback) {
          feedback.textContent = '';
          feedback.classList.remove('is-error');
        }
      });
    });

    recruitmentForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(recruitmentForm);
      const invalidFields = [];

      requiredFields.forEach(({ name, message }) => {
        const field = recruitmentForm.elements[name];
        const value = String(formData.get(name) || '').trim();
        const isSalary = name === 'salario';
        const isQuantity = name === 'quantidade';
        const invalid = isSalary ? getSalaryCents() <= 0 : isQuantity ? Number(value) < 1 : !value;

        if (invalid) {
          setFieldError(field, message);
          invalidFields.push(field);
        } else {
          setFieldError(field);
        }
      });

      if (invalidFields.length) {
        if (feedback) {
          feedback.textContent = 'Revise os campos obrigatórios destacados para solicitar o orçamento.';
          feedback.classList.add('is-error');
        }
        invalidFields[0]?.focus();
        return;
      }

      const vaga = String(formData.get('vaga') || '').trim();
      const area = String(formData.get('area') || '').trim();
      const nivel = String(formData.get('nivel') || '').trim();
      const salario = String(formData.get('salario') || '').trim();
      const contratacao = String(formData.get('contratacao') || '').trim();
      const modalidade = String(formData.get('modalidade') || '').trim();
      const carga = String(formData.get('carga') || '').trim();
      const urgencia = String(formData.get('urgencia') || '').trim();
      const quantidade = String(formData.get('quantidade') || '').trim();
      const beneficios = getSelectedBenefits();
      const observacoes = String(formData.get('observacoes') || '').trim();

      const message = [
        'Olá! Gostaria de solicitar um orçamento de recrutamento e seleção pela ContrateExpress.',
        '',
        `Vaga aberta: ${vaga}`,
        `Área profissional: ${area}`,
        `Nível da vaga: ${nivel}`,
        `Salário base: ${salario}`,
        `Forma de contratação: ${contratacao}`,
        `Modalidade: ${modalidade}`,
        `Carga horária semanal: ${carga}`,
        `Urgência: ${urgencia}`,
        `Quantidade de profissionais: ${quantidade}`,
        `Benefícios ou adicionais: ${beneficios.length ? beneficios.join(', ') : 'Nenhum benefício informado'}`,
        `Observações: ${observacoes || 'Não informado'}`,
        '',
        'Aguardo o contato de um especialista.',
      ].join('\n');

      openWhatsApp(message);
      recruitmentForm.reset();
      benefitCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      renderBenefits();
      recruitmentForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => setFieldError(field));
      const quantityField = recruitmentForm.querySelector('#quantidade');
      if (quantityField) quantityField.value = '1';
      if (feedback) {
        feedback.textContent = 'Orçamento preparado para envio no WhatsApp.';
        feedback.classList.remove('is-error');
      }
    });
  }

  if (accordion) {
    const detailsItems = Array.from(accordion.querySelectorAll('details'));
    detailsItems.forEach((details) => {
      details.addEventListener('toggle', () => {
        details.setAttribute('aria-expanded', String(details.open));
        const summary = details.querySelector('summary');
        summary?.setAttribute('aria-expanded', String(details.open));
      });
      const summary = details.querySelector('summary');
      if (summary) {
        summary.setAttribute('role', 'button');
        summary.setAttribute('aria-expanded', String(details.open));
      }
    });
  }

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
});
